pipeline {

  agent any
  environment {
    DOCKER_IMAGE = "tuananh2582000/zahoo-reactjs"
    DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
    REACT_APP_BASE_URL="https://zahoo.xyz:5000"
    REACT_APP_PEER_PORT="3001"
    REACT_APP_PEER_PATH="/"
  }

  stages {
      
    stage("build") {
            
        steps {
        
        withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
            
            sh "docker build --build-arg REACT_APP_BASE_URL=${REACT_APP_BASE_URL} --build-arg REACT_APP_PEER_PORT=${REACT_APP_PEER_PORT} --build-arg REACT_APP_PEER_PATH=${REACT_APP_PEER_PATH} -t  ${DOCKER_IMAGE}:${DOCKER_TAG} . "
            sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            sh "docker push ${DOCKER_IMAGE}:latest"

        }    

            //clean to save disk
            sh "docker image rm -f ${DOCKER_IMAGE}:${DOCKER_TAG}"
            sh "docker image rm -f ${DOCKER_IMAGE}:latest"
            sh "docker image prune -f"

        }

    }
	  
    stage("ssh"){
            
        steps {
                
        sshPublisher(publishers: [sshPublisherDesc(configName: 'zahoo-chatapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: """cd /home/chatapp
            docker-compose stop frontend
            docker-compose rm -f
            docker-compose pull frontend
            docker-compose up -d
            docker image prune -f""", execTimeout: 120000000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
        }
    } 

  }

}