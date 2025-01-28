pipeline {
    agent any
	
	environment {
        SCANNER_HOME = tool 'sonarqube'
       // NODE_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        VERCEL_TOKEN = credentials('vercel-token') // Credencial para Vercel
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/merchussoft/tiktokchatapi'
                echo 'Git Checkout Completed'
            }
        }

        stage('install vercer global'){
            steps {
                script {
                    //sh 'npm install -g vercel'
                     sh 'which node'
                     sh 'node -v'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {

                script {
                    try {
                        withSonarQubeEnv(credentialsId: 'sonarqube', installationName: 'sonarqube') {
                            sh '''
                                $SCANNER_HOME/bin/sonar-scanner \
                                -Dsonar.projectKey=tiktokchatapi \
                                -Dsonar.projectName=tiktokchatapi \
                                -Dsonar.projectVersion=1.0 \
                                -Dsonar.sources=${env.WORKSPACE} \
                                -Dsonar.sourceEncoding=UTF-8 \
                                -Dsonar.host.url=http://192.168.1.50:9000
                            '''
                        } 
                    } catch (Exception e) {
                        echo "SonarQube analysis failed: ${e.getMessage()}"
                        error("Stopping pipeline due to SonarQube failure.")
                    }
                }
            }
        }

        stage('SonarQube Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES'){
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deply to vercel') {
            steps {
                script {
                    try {
                        echo "Deploying to vercel"

                        // Login to vercel usando token
                        sh '''
                            vercel login --token $VERCEL_TOKEN
                        '''
                    } catch (Exception e) {
                        echo "Vercel deployment failed: ${e.getMessage()}"
                        error("Stopping pipeline due to Vercel deployment failure.")
                    }
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