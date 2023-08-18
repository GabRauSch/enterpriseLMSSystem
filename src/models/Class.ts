import sequelize from "../config/mysql";
import { DataTypes, Model, Optional, Op } from 'sequelize';

interface ClassAttributes {
    id: number;
    title: string;
    videoRef: string;
    moduleId: number;
}


interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

class ClassModel extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
    public id!: number;
    public title!: string;
    public videoRef!: string;
    public moduleId!: number;

    static async createClass(data: ClassCreationAttributes): Promise<ClassModel | null> {
        try {
            const classItem = await ClassModel.findOne({
                where: {
                    [Op.or]: [
                        {title: data.title},
                        {videoRef: data.videoRef}
                    ]
                }
            })

            if(!classItem){
                const classDefinition = await ClassModel.create(data)
                return classDefinition
            }

            return null

        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return null;
        }
    }
    static async updateClassTitle(classId: number, title: string): Promise<boolean | null> {
        try {
            const classDefinition = await ClassModel.update(
                {title},
                {
                    where: {
                        id: classId
                    }
                }
            )
            console.log(classDefinition)
            if(!classDefinition){
                return false
            }
            return true
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return false;
        }
    }
    static async updateClassModule(classId: number, moduleId: number): Promise<boolean | null> {
        try {
            const classDefinition = await ClassModel.update(
                {moduleId},
                {
                    where: {
                        id: classId
                    }
                }
            )
            if(!classDefinition){
                return false
            }
            return true
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return false;
        }
    }
    static async deleteClass(classId: number): Promise<boolean | null> {
        try {
            const classItem = await ClassModel.findByPk(classId);
            if(!classItem){
                return false
            }
            classItem.destroy();
            return true
        } catch (error) {
            console.error('Error fetching status by user ID:', error);
            return false;
        }
    }
}

ClassModel.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoRef: {
        type: DataTypes.STRING
    },
    moduleId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'class'
});

export default ClassModel;
