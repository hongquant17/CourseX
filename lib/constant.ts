export const ROLES: { [key: string]: string } = {
    TEACHER: "3",
    USER: "2",
    ADMIN: "1",
    NOT_ADMIN: "0",
  };

  export const PRIVILEGES: { [key: string]: number } = {
    ADMIN: 0,
    OTHERS: 2,
  };

  export const TYPE_CHANGE: {[key: string]: number} = {
    OTHER_ROLE: 1,
    ADMIN: 2,
    DELETE: 3,
  }