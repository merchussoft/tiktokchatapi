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
                    sh 'docker-compose down'
                    sh 'docker-compose up --build -d'
                }
            }
        }

    }

    post {
        success {
            emailext (
                to: 'merchussoft@hotmail.com',
                subject: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "El build ${env.JOB_NAME} #${env.BUILD_NUMBER} fue exitoso."
            )
        }
        failure {
            emailext (
                to: 'merchussoft@hotmail.com',
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "El build ${env.JOB_NAME} #${env.BUILD_NUMBER} falló. Verifica el log para más detalles."
            )
        }
    }
}