import sequelize from "../config/mysql";
import { DataTypes, Model } from 'sequelize';

interface SegmentAttributes {
    id: number;
    name: string;
    companyId: number;
    hasRightForCourses: boolean;
}

class Segment extends Model<SegmentAttributes> implements SegmentAttributes {
    public id!: number;
    public name!: string;
    public companyId!: number;
    public hasRightForCourses!: boolean;
}

Segment.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: DataTypes.INTEGER
    },
    hasRightForCourses: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'segment'
});

export default Segment;
