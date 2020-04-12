pipeline {
    agent any
    tools {
        maven 'M2_HOME'
      
    }
    stages {
      stage('Build'){
        steps {
          echo "Build step"
          sh 'mvn clean'
          sh 'mvn install'
          sh 'mvn package'
        }
      
      
      }
        stage('test '){
        steps {
          echo "test step"
          sh 'mvn test'
        }
      
      
      }
        stage('deploy'){
        steps {
         sshPublisher(publishers: [sshPublisherDesc(configName: 'Docker-host', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'docker rmi pcontact:v.${BUILD_NUMBER}; docker build -t pcontact:v.${BUILD_NUMBER} .; docker tag pcontact:v.${BUILD_NUMBER} kserge2001/pcontact:v.${BUILD_NUMBER}; docker push kserge2001/pcontact:v.${BUILD_NUMBER};', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: 'webapp/target', sourceFiles: '**/*.war')], usePromotion


