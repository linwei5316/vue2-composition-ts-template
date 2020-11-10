import { createServer, Model, Response } from "miragejs";
import apiPath from "@/api/path";

export const createMockServer = ({ environment = "development" } = {}) => {
  return createServer({
    models: {
    },
    routes() {
      this.urlPrefix = process.env.API_ORIGIN as string;

      
    },
  });
}

export default createMockServer;
