### Global architecture
![img](architect.png)


### Proplem we did solve 

 This is example of an application that produce data , and send it to the Azure event hub then , reads data from an Azure Event Hub and sends them to different Service Bus queues based on specific criteria. Subsequently, the application should listen to the queues, retrieve the messages, and store them in a MongoDB database for further processing and analysis.

### To setup the project
First you need to install docker  [https://www.docker.com/products/docker-desktop/](Docker Web site ).
Then 
```sh
# clone the project 
git clone https://github.com/msHamed1/Azure-Nest.git

# navigate to the project 
cd Azure-Nest

# build the container it will run mongo , mongo-express  and will build the frontend for you  
docker-compose up


```

At this point you will have mongo db connection string bellow   
[MongoExpress]( http://localhost:8081/) #PORT 8081 [use name = mexpress , password = mexpress]
[Frontend]( http://localhost:4002/) on #PORT 4002  running on a docker container

```sh
# install backend dependicies 
cd packages/Backend && npm install 

# [YOU are in the backend folder still for windows ] run

echo > .env 

#add your you settings for your .env file 

DATABASE_URL=mongodb://root:password@localhost:27017/
EVENT_HUB_CONNECTION #contact me for the URL
EVENT_HUB_GROUP=$Default
EVENT_BUS_SERVICE #contact me for the URL
EVENT_HUB_SEND_CONNECTION #contact me for the URL

# Once .env file is created and its values added 

### run and combile 

npm run start:dev #Project gateway

npm run start:EH-consumer #Event hub consumer microservice

npm run start:EH-producer #Event hub consumer microservice

npm run start:SB-consumer #Seruvce bus consumer microservice

```

