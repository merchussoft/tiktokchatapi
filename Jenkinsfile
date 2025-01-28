pipeline {
    agent any
	
	environment {
        SCANNER_HOME = tool 'sonarqube'
        //NODE_HOME = tool 'NodeJS', type: 'NodeJSInstallation'
        //PATH = "${NODE_HOME}/bin:${env.PATH}"
        //VERCEL_TOKEN = credentials('vercel-token') // Credencial para Vercel
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/merchussoft/tiktokchatapi'
                echo 'Git Checkout Completed'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(credentialsId: 'sonarqube', installationName: 'sonarqube') {
                    sh '''
					$SCANNER_HOME/bin/sonar-scanner \
						-Dsonar.projectKey=tiktokchatapi \
						-Dsonar.projectName=tiktokchatapi \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.sources=/var/jenkins_home/workspace/tiktokchatapi \
                        -Dsonar.sourceEncoding=UTF-8 \
                        -Dsonar.host.url=http://192.168.1.50:9000
					'''
                    echo 'SonarQube Analysis Completed'
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! The application has been deployed."
        }
        failure {
            echo "Pipeline failed! The application has not been deployed."
        }
    }
}