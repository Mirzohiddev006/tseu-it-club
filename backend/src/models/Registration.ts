import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface RegistrationAttributes {
  id: number;
  clubId: number;
  club: string;
  name: string;
  faculty: string;
  course: string;
  phone: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

interface RegistrationCreationAttributes
  extends Optional<
    RegistrationAttributes,
    "id" | "notes" | "status" | "createdAt" | "updatedAt"
  > {}

class Registration
  extends Model<RegistrationAttributes, RegistrationCreationAttributes>
  implements RegistrationAttributes
{
  public id!: number;
  public clubId!: number;
  public club!: string;
  public name!: string;
  public faculty!: string;
  public course!: string;
  public phone!: string;
  public notes?: string;
  public status!: "pending" | "approved" | "rejected";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Registration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "club_id",
    },
    club: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    faculty: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    course: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "registrations",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["club_id"] },
      { fields: ["status"] },
      { fields: ["created_at"] },
    ],
  }
);

export default Registration;
