import axios from 'axios'

export const API = {
    getAllLists: function(){
        return axios.get('/allLists')
    },
    getAllUsers: function(listId){

    },
    getData: function(type, id){
        return axios.get(`/data/${type}/${id}`)
    },
    newList: function(listData){
        return axios.post('/list', {
            name: listData.name,
            users: listData.users
        })
    },
    applyExceptions: function(list){
        return axios.post('/applyExceptions', {list})
    },
    addUserSelection: function(userId, selectionId){
        return axios.put('/addUserSelection', {userId, selectionId});
    },
    updateUser: function(userData, id){

    },
    deleteUser: function(id){

    }
};