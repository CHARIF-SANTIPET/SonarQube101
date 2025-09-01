pipeline {
    agent any

    environment {
        SONARQUBE = credentials('sonarqube-token') // ชื่อ Credential ของ Jenkins
    }

    tools {
        nodejs "NodeJS_Installation_Name"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/CHARIF-SANTIPET/SonarQube101.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npx sonar-scanner -Dsonar.projectKey=mywebapp'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
