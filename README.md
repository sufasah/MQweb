# Task Application
This repository is created for Kartaca internship period task. It is here the used technologies.

| Database  | Rest Api and Database Service | Containerization | Event Streaming | 
|:-:|:-:|:-:|:-:|
|MySQL|Java Spring Boot|Docker|Apache Kafka|

#### Versions

* **MySQL Server:** 8.0
* **JDK:** 8
* **Spring Boot:** 2.4.4
* **Docker Engine:** 20.10.5
* **Docker Compose:** 3.9.0
* **Apache Kafka:** 2.7.0
* **Docker Images:** openjdk:8 - wurstmeister/kafka:2.7.0 - wurstmeister/zookeeper:3.4.6 - mysql:8.0

:grey_exclamation: ---------------------------------------------------------------------------------------------------------------- :grey_exclamation:

**Personal Task Sharing Code:** *gAAAAABgUOwzPuJFbNQpPz8_wPOGRqbfaJoLXJHvwSV1V7pCL0AspLhcYbm6VNs_UnLFjhAPAvm-
rPBcNpcQIAEhaKdXackYfhhMvE3MUYWVAqq8EFgZJLOGeUT9DPuTPULbMVfD7QFdhmH2k8_Ps9RB
Lj07cEQCY0xXYON6GgximjokjiX3ulJD3X-Qc5ez6zcTSYuVtNl0*

:grey_exclamation: ---------------------------------------------------------------------------------------------------------------- :grey_exclamation:

## How It works ?
*There are five components works in individual containers created via docker images shown at the image below.*

![System Schema](img/system-schema.png)

User sends an http requests to the api server with `http://localhost:8080/api/data/${MethodType}` url format and url method type parameter and using http method type have to be same. Supported methods are `Get`, `Post`, `Put`, `Delete`. Then, The Api generates `LogData` model which has `methodType, timeDelay, timestamp` information and creates [mylog.txt](task-rest-api/mylog.txt) file inside its root foolder which is written the data inside with `log: "methodType,timeDelay,timestamp"` format. Also it sends this information to the apache kafka as a `json string` for consumer database service to make data processed. Database service gets that data from kafka and saves to the mysql database. At the end, all requests seperated by method types with different colors are shown as a graphic for 1 hour in a dashboard.


## How to run ?

**At first you need to download this project, setup appropriate versions of `docker`, `docker compose` and make yourself sure about `8080`, `9092`, `9093`, `3306` ports are not used.**

Open root project folder [task-parent](.) in a terminal and run these commands in order.

```shell
C:\task-parent> docker-compose build
C:\task-parent> docker-compose up -d
```

If all containers build successfully, that means system is on! You can send http requests and watch dashboard's change.
