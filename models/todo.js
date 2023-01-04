// models/todo.js
'use strict';
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdues=await Todo.overdue()
      for(let i=0;i<overdues.length;i++){
        console.log(overdues[i].displayableString());
      }
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems=await Todo.dueToday()
      for(let i=0;i<dueTodayItems.length;i++){
        console.log(dueTodayItems[i].displayableString());
      }
      // FILL IN HERE
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems=await Todo.dueLater()
      for(let i=0;i<dueLaterItems.length;i++){
        console.log(dueLaterItems[i].displayableString());
      }
      // FILL IN HERE
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return await Todo.findAll({
        where:{
          dueDate:{
            [Op.lt]:new Date()
          }
        }
      })
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return await Todo.findAll({
        where:{
          dueDate:{
            [Op.eq]:new Date()
          }
        }
      })
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]:new Date()
          }
        }
      })
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const todo=await Todo.update({completed:true},{
        where:{
          id
        }
      })

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}${this.dueDate===new Date().toLocaleDateString("en-CA")?"":` ${this.dueDate}`}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};