# Noms des membres 

- Ahmet ALTINEL
- Emre ELMA
- Mathieu MONIER
- Guillaume FIQUEMO

# Activités réalisées 

- Ahmet ALTINEL -> Jeu et back
- Emre ELMA -> Jeu et back
- Mathieu MONIER -> Dockerisation (dockercompose, dockerfile, proxy et ajustements des url/liens... dans le back)
    - **Voir branche dockerisation**
- Guillaume FIQUEMO -> Chat avec historisation en bdd, PostgreSQL pour le chat

# Lien vers le Git 

- https://gitlab.com/cpelyon/info/5irc-2025-2026/asi-2-2024-2025/groupe-6/atelier2

# Liste des éléments réalisés

- Docker sans le chat (branche Dockerisation)
- Le jeu
- Le chat avec historisation en bdd
- proxy

# Liste des éléments non-réalisés

- Bus de log 
- CI CD 
- tests unitaires

# Installation

### Docker

```bash
docker run -d --gpus=all -e NVIDIA_DRIVER_CAPABILITIES=compute,utility -e NVIDIA_VISIBLE_DEVICES=all --name asi2-fooocus-api -p 8888:8888 konieshadow/fooocus-api

docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

docker run -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:5.18.3
```

###  Lancer les microservices

Pour front, game-service, backend_node_chat:
```bash
npm install
npm start
```

Pour le reste des microservices, ouvrez un terminal et exécutez :
```bash
cd le_microservice
mvn spring-boot:run
```
