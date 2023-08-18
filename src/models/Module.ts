import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';

interface ModuleAttributes {
    id: number;
    title: string;
    description: string;
}

interface ModuleCreationAttributes extends Optional<ModuleAttributes, 'id'> {}

class Module extends Model<ModuleAttributes, ModuleCreationAttributes> implements ModuleAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
}

Module.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'module'
});

export default Module;
