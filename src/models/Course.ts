import sequelize from "../config/mysql";
import { DataTypes, Model, Optional } from 'sequelize';

interface CourseAttributes {
    id: number;
    name: string;
    ownerId: number;
    description: string;
    tagsList: string[];
    pontuation: number;
    evaluation: number;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}

class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
    public id!: number;
    public name!: string;
    public ownerId!: number;
    public description!: string;
    public tagsList!: string[];
    public pontuation!: number;
    public evaluation!: number;

    static async getCourseById(id: number): Promise<Course | null> {
        try {
            const course = await Course.findOne({
                where: { id }
            });
            return course;
        } catch (error) {
            console.error('Error fetching course by ID:', error);
            return null;
        }
    }
    static async createCourse(data: CourseCreationAttributes): Promise<Course | null> {
        try {
            const course = await Course.create(data);
            return course;
        } catch (error) {
            console.error('Error creating course:', error);
            return null;
        }
    }
}

Course.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    ownerId: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    tagsList: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    pontuation: {
        type: DataTypes.INTEGER
    },
    evaluation: {
        type: DataTypes.DOUBLE
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'course'
});

export default Course;
