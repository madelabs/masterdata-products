const uuid = require('uuid');

class Product {
    constructor(
        id,
        tenant_id,
        code,
        description,
        height,
        length,
        name,
        revision,
        status,
        unitOfMeasure,
        weight,
        width,
        created,
        lastUpdated
        ) {
        
        if (!id) {
            id = uuid.v1();
        }

        if (!created) {
            created = new Date()
        }
        
        this.id = id;
        this.tenant_id = tenant_id;
        this.code = code;
        this.description = description;
        this.height = height;
        this.length = length;
        this.name = name;
        this.revision = revision;
        this.status = status;
        this.unitOfMeasure = unitOfMeasure;
        this.weight = weight;
        this.width = width;
        this.created = created;
        this.lastUpdated = lastUpdated;
    }
}

module.exports = Product;