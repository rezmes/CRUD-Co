import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import CrudCo from './components/CrudCo';
import { ICrudCoProps } from './components/ICrudCoProps';

export default class CrudCoWebPart extends BaseClientSideWebPart<ICrudCoProps> {

  public render(): void {
    const element: React.ReactElement<ICrudCoProps> = React.createElement(
      CrudCo,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        context: this.context  // Ensure you're passing this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configure your CRUD Web Part"
          },
          groups: [
            {
              groupName: "General",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Description"
                }),
                PropertyPaneTextField('listName', {
                  label: "List Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
