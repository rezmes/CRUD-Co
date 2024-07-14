import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICrudCoProps {
  description: string;
  listName: string;
  context: WebPartContext;
}
