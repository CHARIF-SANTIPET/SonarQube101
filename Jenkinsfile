pipeline {
    agent any

    environment {
        SONARQUBE = credentials('sonar-token') // ชื่อ Credential ของ Jenkins
    }

    tools {
        nodejs "NodeJs"
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
                withSonarQubeEnv('sonarqube-v25.8.0.112029') {
                    sh 'npx sonar-scanner -Dsonar.projectKey=SonarQube101'
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
