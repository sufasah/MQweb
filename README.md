# Task Application

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

**Personal Task Sharing Code:** *gAAAAABgUOwzPuJFbNQpPz8_wPOGRqbfaJoLXJHvwSV1V7pCL0AspLhcYbm6VNs_UnLFjhAPAvm-rPBcNpcQIAEhaKdXackYfhhMvE3MUYWVAqq8EFgZJLOGeUT9DPuTPULbMVfD7QFdhmH2k8_Ps9RBLj07cEQCY0xXYON6GgximjokjiX3ulJD3X-Qc5ez6zcTSYuVtNl0*

:grey_exclamation: ---------------------------------------------------------------------------------------------------------------- :grey_exclamation:

## How It works ?
*There are five components works in individual containers created via docker images shown at the image below.*

![System Schema](img/system-schema.png)

User sends an http requests to the web api server with `http://localhost:8080/api/data/${MethodType}` url format and url method type parameter but using http method type has to be same. Supported methods are `Get`, `Post`, `Put` and `Delete`. Then, The Api generates `LogData` model which has `methodType, timeDelay, timestamp` information and creates [mylog.txt](task-rest-api/mylog.txt) file inside its root folder which is written the data inside with `log: "methodType,timeDelay,timestamp"` format. Also it sends this information to the apache kafka as a `json string` for consumer database service to make data processed. Database service gets that data from kafka and saves to the mysql database. At the end, all requests seperated by method types with different colors are shown as a chart for last one hour in a dashboard. The live changes on dashboard is shown at `http://localhost:8080/` root page by using spring websockets.

**URL list**
http://localhost:8080/api/data/${MethodType}
http://localhost:8080/

## How to run ?

**At first you need to download this project, setup appropriate versions of `docker`, `docker compose` and make yourself sure about `8080`, `9092`, `9093`, `3306` ports are not used.**

Open root project folder [task-parent](.) in a terminal and run these commands in order.

```shell
C:\task-parent> docker-compose build
C:\task-parent> docker-compose up -d
```
Or if you use windows, you can just execute [start-project.bat](./start-project.bat) file.

If all containers created successfully, that means system is on! You can send http requests and watch dashboard's change.

To turn off the system you can run commands below or also just execute [stop-project.bat](./stop-project.bat) file.

```shell
C:\task-parent> docker-compose down
```


# G??rev Uygulamas??

| Veritaban??  | Rest Aray??z?? ve Veritaban?? Servisi | Konteynerizasyon | Olay Ak????lar?? | 
|:-:|:-:|:-:|:-:|
|MySQL|Java Spring Boot|Docker|Apache Kafka|

#### Versiyonlar

* **MySQL Server:** 8.0
* **JDK:** 8
* **Spring Boot:** 2.4.4
* **Docker Engine:** 20.10.5
* **Docker Compose:** 3.9.0
* **Apache Kafka:** 2.7.0
* **Docker Images:** openjdk:8 - wurstmeister/kafka:2.7.0 - wurstmeister/zookeeper:3.4.6 - mysql:8.0

:grey_exclamation: ---------------------------------------------------------------------------------------------------------------- :grey_exclamation:

**Ki??isel g??rev payla????m kodu:** *gAAAAABgUOwzPuJFbNQpPz8_wPOGRqbfaJoLXJHvwSV1V7pCL0AspLhcYbm6VNs_UnLFjhAPAvm-rPBcNpcQIAEhaKdXackYfhhMvE3MUYWVAqq8EFgZJLOGeUT9DPuTPULbMVfD7QFdhmH2k8_Ps9RBLj07cEQCY0xXYON6GgximjokjiX3ulJD3X-Qc5ez6zcTSYuVtNl0*

:grey_exclamation: ---------------------------------------------------------------------------------------------------------------- :grey_exclamation:

## Nas??l ??al??????r ?
*A??a????daki resimde g??sterildi??i gibi docker imajlar?? arac??l??????yla olu??turulan 5 adet konteyner bile??eni bulunmaktad??r.*


![System Schema](img/system-schema.png)

Kullan??c?? web aray??z sunucusuna `http://localhost:8080/api/data/${metodTipi}` url format??nda bir http iste??i yollar fakat metod tipi parametresi ile kullan??lan http metodu ayn?? olmal??d??r. Desteklenenen metodlar `Get`, `Post`, `Put` ve `Delete`'dir. Sonras??nda aray??z i??erisinde `methodType, timeDelay, timestamp` verilerini i??eren `LogData` modelini ??retir ve [mylog.txt](task-rest-api/mylog.txt) dosyas??n??, i??erisinde `log: "methodType,timeDelay,timestamp"` format??nda bilgiyi tutacak ??ekilde k??k dizini i??erisinde olu??turur. Ayr??yeten, apache kafka'ya `json string` olarak t??ketici veritaban?? servisinin veriyi i??lemesi i??in g??nderir. Veritaban?? servisi bu veriyi kafkadan alarak mysql veritaban??na kaydeder. En sonunda, pano sayfas??nda son bir saatlik metod tiplerine g??re farkl?? renklerde ayr????t??r??lan b??t??n istekler bir grafikte g??sterilir. Panodaki canl?? de??i??imler `http://localhost:8080/` k??k dizini sayfas??nda websoketler kullan??larak g??sterilir.

**URL listesi**
http://localhost:8080/api/data/${MethodType}
http://localhost:8080/

## Nas??l ??al????t??r??l??r ?
**??ncelikle projeyi indirmeniz, `docker`, `docker-compose`'un uygun versiyonlar??n?? kurman??z ve `8080`, `9092`, `9093`, `3306` portlar??n??n kullan??lmad??????ndan emin olman??z laz??m.**

[Task-parent](.) k??k dizinini bir terminal ??zerinde a????n ve ??u komutlar?? s??ras??yla ??al????t??r??n.

```shell
C:\task-parent> docker-compose build
C:\task-parent> docker-compose up -d
```

Ya da e??er windows kulan??yorsan??z, sadece k??k dizindeki [start-project.bat](./start-project.bat) dosyas??n?? ??al????t??rabilirsiniz.

E??er t??m konteynerlar ba??ar??yla olu??turulduysa, bu demektir ki sistem ??al??????yor! Http istekleri g??nderebilir ve panonun de??i??imini izleyebilirsiniz.

Sistemi durdurmak i??in a??a????daki komutlar?? ??al????t??rabilirsiniz ya da yine sadece [stop-project.bat](./stop-project.bat) dosyas??n?? ??al????t??rabilirsiniz.

```shell
C:\task-parent> docker-compose down
```
