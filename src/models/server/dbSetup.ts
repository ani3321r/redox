import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB(){
    try{
        await databases.get(db)
        console.log("Db connected");
        
    } catch(error){
        try{
            await databases.create(db, db)
            console.log("Db created");
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ])
            console.log("connection created");
            console.log("Db connected");  
        } catch(error){
            console.log("Error while creating Db", error);
            
        }
    }
    return databases
}