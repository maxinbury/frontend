const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload };

    case "UPDATE_IMAGES":
      return { ...state, images: [...state.images, action.payload] };
      case 'DELETE_IMAGE':
        return {
          ...state,
          images: state.images.filter((image) => image !== action.payload),
        };
  
    default:
      throw new Error('No matched action!');
  }
};

export default reducer;