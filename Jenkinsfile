pipeline {
    agent none

    stages {
        stage('install dependencias') {
            agent {
                docker {
                    image 'node:18' // Usamos una imagen oficial de Node.js
                    args '-u root' // Ejecutamos como root para instalar dependencias si es necesario
                }
            }

            steps {
                sh 'npm install' // Instalamos las dependencias
            }
        }
    }
}