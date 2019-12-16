const dogReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_DOG':
            let index = state.findIndex(dog => dog.id == action.data.id)
            if (index == -1) {
                return [...state, action.data]
            }
            return state;
        case 'DELETE':
            return state.filter((dog) => dog.id !== action.id)
        case 'EDIT':
            return state.map((dog) => dog.id === action.id ? {...dog, editing: !dog.editing } : dog)

        case 'ADD_EDIT_DOG':
            return state.map((dog) => {
                if (dog.id === action.data.id) {
                    dog.name = action.data.name
                    dog.breed = action.data.breed
                    dog.description = action.data.description
                    dog.editing = !action.dog.editing
                    return dog;
                }

                return dog;
            })
        case 'ADDING_DOG':
            return state;
        case 'DOG_EDIT_ERROR':
            return state.map((dog) => {
                if (dog.id === action.id) {
                    dog.errorMessage = action.message;
                    return dog;
                }
                return dog;
            })
        case 'CLEAR_ERROR':
            return state.map((dog) => {
                if (dog.id === action.id) {
                    dog.errorMessage = '';
                    return dog;
                }
                return dog;
            })
        default:
            return state
    }
}

export default dogReducer;