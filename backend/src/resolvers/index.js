import { resolvers } from "graphql-scalars";
import UserResolver from "./UserResolver";
import ClassResolver from "./ClassResolver";
import AttendenceResolver from "./AttendenceResolver";

export default [resolvers, UserResolver, ClassResolver, AttendenceResolver];
