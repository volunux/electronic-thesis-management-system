import { Request , Response , NextFunction } from 'express';

export class ProxyController<T> {

  public static create<T>(o : any) : T {

  let instanceProps : string[] = Object.getOwnPropertyNames(o);

  let prototypeProperties : string[] = Object.getOwnPropertyNames(Object.getPrototypeOf(o));

  let genericObjectProperties : string[] = Object.getOwnPropertyNames(Object.prototype);

  genericObjectProperties.concat(Object.getOwnPropertyNames(globalThis));

     let proxyObject : any = {};

  for (let ix of prototypeProperties) {

    if (genericObjectProperties.indexOf(ix) === -1 && o[ix].constructor.name === "AsyncFunction" && o[ix].length > 1 && o[ix].length <= 3) { proxyObject[ix] = o[ix].bind(o); } }

  for (let ix of prototypeProperties) {

      if (o[ix].length >= 1 && o[ix].length <= 3 && o[ix].constructor.name === "AsyncFunction") {

    proxyObject[ix] = function(req : Request , res : Response , next : NextFunction) {

      return (o[ix].bind(o))(req , res , next).catch((err : any) => {

        next(err); }); }

    }

    else if (o[ix].length >= 1 && o[ix].length <= 3 && o[ix].constructor.name === "Function") {

    proxyObject[ix] = function(req : Request , res : Response , next : NextFunction) {

      return (o[ix].bind(o)(req , res , next)); }

    } }

    proxyObject = Object.assign(proxyObject , o);

    return proxyObject as T;

   }


}