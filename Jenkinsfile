pipeline {

    agent any

    stages {

        stage('Clone Repository') {

            steps {

                git branch: 'Main', url: 'https://github.com/Rock-D-Xebec-1835/Quantity_Backend'

            }

        }

        stage('Install Dependencies') {

            steps {

                sh 'npm install'

            }

        }

        stage('Deploy To Backend EC2') {

            steps {

                sh '''
                ssh -o StrictHostKeyChecking=no \
                -i /home/ubuntu/quantity-measurement-backend.pem \
                ubuntu@54.196.237.53 << EOF

                cd Quantity_Backend

                git pull origin master

                npm install

                pm2 restart quantity-backend

                EOF
                '''
            }

        }

    }

}
