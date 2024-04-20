pipeline {
  agent {
    node {
      label 'Node'
    }

  }
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
        echo 'Dependencies installed'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

  }
}