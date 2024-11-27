export default class DataManager {
    static myInstance = null;
    userID ="";

    charities = [
        {
            userid: "1",
            charityid:1,
            title:"Health Charity",
            subtitle:"this gonna be a desciption of health charity",
            image:require("../assets/cardCover.jpeg"),
            category:"Disease",
        },
        {
            userid: "1",
            charityid:2,
            title:"Environment Charity",
            subtitle:"this gonna be a desciption of health charity",
            image:require("../assets/profilePic.jpeg"),
            category:"Environment",
        },
        {
            userid: "2",
            charityid:1,
            title:"Health Charity",
            subtitle:"yeah",
            image:require("../assets/profilePic.jpeg"),
            category:"Disease",
        }
    ]

    users = [
        {
            id:"1",
            name:"Natalie",
            email: "yuchen@g.com",
            password: "1234",
        },
        {
            id:"2",
            name:"Jon Snow",
            email: "js@gmail.com",
            password: "2345",
        },
    ];
   
    
    static getInstance(){
        if(DataManager.myInstance == null){
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance
    }
    
    getUserID(){
        return this.userID;
    }

    setUserId(id){
        this.userID = id;
    }

    //for charities
    getCharities(id){
        return this.charities.filter((charity)=> charity.userid === id);
    }

    getCharitiesByCategory(userid,category){
        return this.charities.filter((charity)=> charity.userid === userid && charity.category === category);
    }

    addCharity(charity){
        this.charities.push(charity);
    }

    deleteCharity(charityID, userID) {
        this.charities = this.charities.filter(
            (charity) => charity.charityid !== charityID || charity.userid !== userID
        );
    }

    //for accounts
    addUser(user){
        this.users.push(user);
    }

}