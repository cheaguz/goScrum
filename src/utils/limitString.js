export const limitString = (str) => {
    if (str.length > 150) {
      return { string: str.slice(0, 147).concat('...'), addButton: true }
    }
    return { string: str, addButton: false }
  }
