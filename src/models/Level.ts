import sequelize from "../config/mysql";
import { DataTypes, Model } from 'sequelize';

interface LevelAttributes {
    id: number;
    limitPontuation: number;
}

class Level extends Model<LevelAttributes> implements LevelAttributes {
    public id!: number;
    public limitPontuation!: number;
}

Level.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    limitPontuation: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'level'
});

export default Level;
