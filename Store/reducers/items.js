import { CHANGE_ITEM, REMOVE_ACTIVITY, SAVE_ACTIVITY, TOGGLE_DAY, SET_HOURS_PER_DAY, ADD_NEW_PERIOD_CONFIG } from "../actions/items";

const initialState = {
    text: 'flip',
    hoursPerDayDefault: 6,
    activityItems: [
        {id: 1, name: "Primary"},
        {id: 2, name: "Education"},
        {id: 3, name: "Writing"},
        {id: 4, name: "Biznet"},
        {id: 5, name: "Secondary"},
        {id: 6, name: "Belarussian"},
    ],
    planConfig: [] 
};

// const printConfigList = (list, msg) => {
//     console.log(`-------------`);
//     console.log(msg);

//     for(const config of list) {
//         console.log(`config for month ${config.month} and year ${config.year}`);
//     }
// }

const itemsReducer = (state = initialState, action) => {
console.log(`Actions received: ${action.type}`);

switch(action.type) {
    case ADD_NEW_PERIOD_CONFIG: {
        const planConfigList = [...state.planConfig];
        console.log(`Before adding new period: ${planConfigList.length}`);
        planConfigList.push(action.config);
        console.log(`After adding new period: ${planConfigList.length}`);

        return { ...state, planConfig: planConfigList};
    }
    case SET_HOURS_PER_DAY: {
        const planConfigList = [...state.planConfig];

        for(const config of planConfigList) {
            config.totalHours = config.chosenDays.length * action.hoursPerDay;
        }        

        return { ...state, planConfig: planConfigList, hoursPerDayDefault: action.hoursPerDay };
    }
    case TOGGLE_DAY: {
        
        const hoursPerDay = state.hoursPerDayDefault;
        const planConfigList = [...state.planConfig];


        //console.log(`Toggle for month ${action.month} and year ${action.year}`);
        //printConfigList(planConfigList, "On Toggle Begin");
        

        const planConfig = planConfigList.find(x => x.year == action.year && x.month == action.month);

        const exists = planConfig.chosenDays.indexOf(action.day) != -1;

        const newChosenDay = exists ? 
            planConfig.chosenDays.filter(x => x != action.day) :
            [...planConfig.chosenDays, action.day];

        const newPlanConfig = {
            year: planConfig.year,
            month: planConfig.month,
            chosenDays: newChosenDay,
            totalHours: newChosenDay.length * hoursPerDay
        }

        //printConfigList(planConfigList, "On Toggle Before Filter");

        const newList = planConfigList.filter(x => x != planConfig);

        
       // printConfigList(newList, "On Toggle Before Add");

        newList.push(newPlanConfig);

        //printConfigList(newList, "On Toggle After Add");

        return { ...state, planConfig: newList};
        
    }
    case CHANGE_ITEM: {
        return { ...state, text: action.newText }
    }
    case REMOVE_ACTIVITY:
    {        
        const activityItems = [...state.activityItems];
        const newItems = activityItems.filter(x => x.id != action.id);
        //console.log(`Removing ${action.id}... Was ${activityItems.length}, now ${newItems.length}`);

    return { ...state, activityItems: newItems}   
    }
    case SAVE_ACTIVITY:
        {
            const activityItems = [...state.activityItems];

            let activity = activityItems.find(x => x.id == action.id);
            if(!activity) {
                const max = Math.max.apply(Math, activityItems.map(function(o) { return o.id; }));
                activity = {id: max + 1, name: action.name};
            }
            else {
                activity.name = action.name;
            }
            const newItems = activityItems.filter(x => x.id != action.id);

            return { ...state, activityItems: [...newItems, activity] };           
            }


    default:
        return state;
            

}

    return state;
}

export default itemsReducer;