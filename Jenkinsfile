pipeline {

    agent any

    // Environment Variables
    environment {
        // Docker HUB Password
        DOCKER_USER = credentials('DOCKER_HUB_USER') // Import from Jenkins Credentials
        DOCKER_PASSWD = credentials('DOCKER_HUB_PASSWORD')
	}

    // Options
    options {
        // Timeout for pipeline
        timeout(time:80, unit:'MINUTES')
        skipDefaultCheckout()
    }

    stages {

        // Checkout State
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Cache and Containers Stage
        stage('Cache and Containers') {
            steps {
                sh 'echo $DOCKER_PASSWD | docker login --username $DOCKER_USER --password-stdin'
                sh 'docker-compose pull'
                sh 'docker-compose up --build -d'
                sh 'docker-compose ps'
            }
        }
        stage('Build') {
            steps {
                parallel(backend: {
                    sh 'docker-compose run -T backend_service composer install --no-progress'
                },
                frontend: {
                    sh 'docker-compose run -T front_service npm install'
                })
            }
        }

        // Test Stages
        stage('Test') {
            when {
                expression { params.DEPLOY == false }
            }
            steps {
                parallel(unit: {
                    retry(2){
                        sh 'docker-compose run -T backend_service ci/run_testsuite.sh unit'
                    }
                    retry(2){
                        sh 'docker-compose run -T backend_service ci/run_testsuite.sh integration'
                    }
                },
                acceptance: {
                    retry(2){
                        sh 'docker-compose run -T backend_service ci/run_testsuite.sh acceptance'
                    }
                },
                frontend: {
                    sh 'docker-compose run -T front npm run lint'
                })
            }
            post {
                always {
                    junit 'build/reports/*.xml'
                }
            }
        }

        // Deploy to Staging Stage
        stage('Deploy to Staging') {
            when {
                anyOf {
                    branch 'master'
                }
            }
            steps {
                echo 'Branch is master. So I need to deploy to Staging environment!'
                script {
                    env.STG_VERSION = sh (
                        script:'ci/deploy.sh staging' ,
                        returnStdout: true
                    ).trim()
                    env.APPROVE = true
                }
            }
        }

        // Approval Step
        stage ('Approve'){
            when {
                allOf {
                    branch 'master'
                    expression { return APPROVE ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/ }
                }
            }
            steps {
                slackSend (channel: "#devops", color: '#4286f4', message: "Deploy Approval: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.JOB_DISPLAY_URL})")
                script {
                    try {
                        timeout(time:30, unit:'MINUTES') {
                            env.APPROVE_PROD = input message: 'Deploy to Production', ok: 'Continue',
                                parameters: [choice(name: 'APPROVE_PROD', choices: 'YES\nNO', description: 'Deploy from STAGING to PRODUCTION?')]
                            if (env.APPROVE_PROD == 'YES'){
                                env.DPROD = true
                            } else {
                                env.DPROD = false
                            }
                        }
                    } catch (error) {
                        env.DPROD = true
                        echo 'Timeout has been reached! Deploy to PRODUCTION automatically activated'
                    }
                }
            }
        }

        // Deploy to Production Step
        stage('Deploy to Production') {
            when {
                allOf {
                    branch 'master'
                    expression { return DPROD ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/ }
                }
            }
            steps {
                echo 'Deploy to Production'
                sh "ci/deploy.sh production"
            }
        }
    }

    post {
        success {
            echo 'Deployment has been completed!'
        }
        failure {
            slackSend (color: '#d54c53', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.JOB_DISPLAY_URL})")
        }
        always {
            sh 'docker-compose down'
            sh 'docker volume prune -f'
            cleanWs()
        }
    }
}
