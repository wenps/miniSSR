// const url = "https://api.github.com/users/ruanyf";

export function textApi() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(100);
    }, 1000);
  });
}
