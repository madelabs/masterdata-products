const uuid = require('uuid');

class Product {
    constructor(
        id,
        tenantId,
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
        isForSale,
        isManufacturable,
        allowBackorders,
        created,
        lastUpdated
        ) {
        
        if (!id) {
            id = uuid.v1();
        }

        if (!created) {
            created = new Date()
        }

        if (!isForSale) {
            isForSale = false;
        }

        if (!isManufacturable) {
            isManufacturable = false;
        }

        if (!allowBackorders) {
            allowBackorders = false;
        }
        
        this.id = id;
        this.tenantId = tenantId;
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
        this.isForSale = isForSale;
        this.isManufacturable = isManufacturable;
        this.allowBackorders = allowBackorders;
        this.created = created;
        this.lastUpdated = lastUpdated;
    }
}

module.exports = Product;