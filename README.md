# August23

docker cp Material.json mongodb:/tmp/Material.json

docker exec mongodb mongoimport --jsonArray --db spoc --collection materials --file /tmp/Material.json

docker exec -it mongodb mongosh

docker exec -it mongodb mongosh

use spoc




