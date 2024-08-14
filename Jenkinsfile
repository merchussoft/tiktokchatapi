pipeline {
    agent any 

    stages{
        stage('limpiar-archivos-yu-directorios-antiguos') {
            steps {
                script {
                    // Encuentra y borra archivos y directorios anteriores a 7 dias en el workspace del jenkins
                     sh '''
                     find $WORKSPACE -type f -mtime +7 -exec rm -f {} +
                     find $WORKSPACE -type f -mtime +7 -exec rm -rf {} +
                     '''
                }
            }
        }

        stage('construir-y-desplegar-con-docker-compose') {
            steps {
                script {
                    sh 'docker compose down'
                    sh 'docker compose up --build -d'
                }
            }
        }

        stage('limpiar-contenedores-y-recursos-huerfanos') {
            steps {
                script {
                    sh 'docker system prune -f'
                }
            }
        }

    }

    post {
        always {
            script {
                sh 'docker ps'
            }
        }
    }
}