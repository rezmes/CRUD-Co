// import * as React from 'react';
// import styles from './CrudCo.module.scss';
// import { ICrudCoProps } from './ICrudCoProps';
// import { escape } from '@microsoft/sp-lodash-subset';

// export default class CrudCo extends React.Component < ICrudCoProps, {} > {
//   public render(): React.ReactElement<ICrudCoProps> {
//     return(
//       <div className = { styles.crudCo } >
//   <div className={styles.container}>
//     <div className={styles.row}>
//       <div className={styles.column}>
//         <span className={styles.title}>Welcome to SharePoint!</span>
//         <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
//         <p className={styles.description}>{escape(this.props.description)}</p>
//         <a href='https://aka.ms/spfx' className={styles.button}>
//           <span className={styles.label}>Learn more</span>
//         </a>
//       </div>
//     </div>
//   </div>
//       </div >
//     );
//   }
// }
import * as React from 'react';
import styles from './CrudCo.module.scss';
import { ICrudCoProps } from './ICrudCoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface ICrudCoState {
    items: any[];
    newItemTitle: string;
}

export default class CrudCo extends React.Component<ICrudCoProps, ICrudCoState> {
    constructor(props: ICrudCoProps) {
        super(props);
        this.state = {
            items: [],
            newItemTitle: ""
        };
    }

    public componentDidMount() {
        this._getListItems();
    }

    private _getListItems(): void {
      sp.web.lists.getByTitle(this.props.listName).items.get().then((items: any[]) => {
          this.setState({ items });
      }).catch(error => {
          console.error("Error fetching list items:", error);
      });
  }

  private _addListItem(): void {
      if (this.state.newItemTitle) {
          sp.web.lists.getByTitle(this.props.listName).items.add({
              Title: this.state.newItemTitle
          }).then(() => {
              this.setState({ newItemTitle: "" });
              this._getListItems();
          }).catch(error => {
              console.error("Error adding a list item:", error);
          });
      }
  }

  private _deleteListItem(itemId: number): void {
      sp.web.lists.getByTitle(this.props.listName).items.getById(itemId).delete().then(() => {
          this._getListItems();
      }).catch(error => {
          console.error("Error deleting a list item:", error);
      });
  }
    public render(): React.ReactElement<ICrudCoProps> {
        return (
            <div className={styles.crudCo}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Welcome to SharePoint!</span>
                            <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
                            <p className={styles.description}>{escape(this.props.description)}</p>
                            <input
                                type="text"
                                value={this.state.newItemTitle}
                                onChange={(e) => this.setState({ newItemTitle: e.target.value })}
                                placeholder="New item title"
                            />
                            <button onClick={() => this._addListItem()}>Add Item</button>
                            <ul>
                                {this.state.items.map(item => (
                                    <li key={item.Id}>
                                        {item.Title}
                                        <button onClick={() => this._deleteListItem(item.Id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
