import sequelize from "../config/mysql";
import {DataTypes, Model} from 'sequelize'


interface LevelInstance  extends Model{
    id: number,
    limitPontuation: number
}

export const Level = sequelize.define<LevelInstance>('Level', {
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
    timestamps: false,
    tableName: 'level'
})