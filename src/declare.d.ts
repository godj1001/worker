// scss模块声明
declare module '*.module.scss' {
  const content: {[key: string]: any;};
  export = content;
}