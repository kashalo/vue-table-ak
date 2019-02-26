# VUE Table AK

Interactive table is responsive VUE table component with powerful features which give you the flexibility to use in any web projects
 
 
## VUE Table AK Components Features

* Add new item 
* Bulk edit and delete action
* Instance local search or remote search
* Pagination 
* Limit perPage 
* Column sorting Desc or ASC
* In-line editing
* in-line bulk actions
* Responsive
* Filter by Date
* Column toggling
* Reusable
* Configurable

## Prerequisite

-  This package is vue Components so you must have VUE in order to use it.
-  Your data must contain any kind of unique key in order the Table action (Edit , InlineEdit , Delete ) to work properly. If you didn't specifiy the unique key the components by default will consider that your feed contain property called **id** and look for that unique key if the component coudn't find it, the bulk actions will be disabled even if you enabled it in the configuration. Of course you can change the default behavior to use any other field as long as it's uniqe for example if your unique key is **sku** you can define that in the configuration for more details please check the config section. [please check the config section](#config-object)


## Usage

This components accept two Props : 

- **feed** (Required) type `Array` : this is the main data source for the table to render the HTML content if the feed is not valid or empty an error page will be displayed
- **Config** (Optional) type `Object`: The config Probs allow you to configure the table features based on your requreiments and it's completely optional if not specified the default configuration will be used.

 

**exmaple without the config option:**

```html
 <vue-table-ak feed="data" ></vue-table-ak>
``` 

**exmaple with the config option:**

```html
 <vue-table-ak feed="data"  :config="tableConfig"></vue-table-ak>
``` 



**Probs Exmaple:**

***Feed Object:***

 ```javascript
[{
	id: 1,
	title: "My First Product",
	description: "My first product description",
	price: " 100$",
	date_created: "2019-03-13T09:43:05-07:00"
}, {
	id: 1,
	title: "My Second Product",
	description: "My second product description",
	price: " 200$",
	date_created: "2018-02-13T09:43:05-07:00"
}]
```


***Config Object***

Config object accept several options so you can mainuplate the components behavior , we will walk through each one.

          tableConfig: {
			uniqueKey: "id",
            date: { active: false, format: "MMMM Do YYYY, h:mm:ss a" },
            perPage: [5, 10, 15],
            title: "My Products List",
            bulkActions: true,
            addNewItem: true ,
			searchType: "remote",
    		paginationLength: 0,
            paginationLimit: 10
            newItemFields: [
              {
                name: "title",
                type: "text",
                required: true,
                value: ""
              },{
                name: "description",
                type: "text",
                required: true,
                value: ""
              }, {
                name: "price",
                type: "number",
                required: true,
                value: ""
              }],
            editItemsFields: [
              {
                name: "title",
                type: "text",
                required: true,
                value: ""
              },{
                name: "description",
                type: "text",
                required: true,
                value: ""
              }, {
                name: "price",
                type: "number",
                required: true,
                value: ""
              } ],
            actions: {
              edite: true,
              delete: true
            },
            columns: [
              {
                name: "title",
                active: true,
                isEditable: false
              },{
                name: "description",
                active: true,
                isEditable: true
              }, {
                name: "price",
                active: true,
                isEditable: true
              }]
          }


**Config Object Proprties details:**
 
**uniqueKey property**
----

In order the actions features in this components to work properly your feed **must** contain uniquekey.

You can define the uniqueKey through this property or you can use the default value `id`

**Note:** if the unique is not found in the data feed the bulk actions will be disabled.

- type: `string`
- default: `id`

 **Example:**
 ```javascript
      config: {
		uniqueKey: "sku"
		}
```


***date property***
---
Through this property you have the ability to toggle the date filter and define how you want the date data to be formatted within the table content.

- type: `object`
- default: `{ active: true, format: "MMMM Do YYYY, h:mm:ss a" }`

 **Example:**
 ```javascript
      config: {
       	    date: { 
				active: false,
				format: "MMMM Do (YYYY), h:mm:ss a" }
				  }
			}
```

 **perPage**
---
You can define how many item to be displayed in each page.

 - type: `array`
 - default: `[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]`


 **Example:**
 ```javascript
      config: {
   			perPage: [5, 10, 15]
  			 }
```

 **title**
---
You can define custom title of the table to be displayed as table Title

 - type: `string`
 - default `empty`
 
  **Example:**
 ```javascript
      config: {
   			title: "My Product Table"
  			 }
```
  
  
 **bulkActions**
---
 
  - type: `boolean`
  - default: `true`
  
  This **bulkActions** property give you the flexbility to disable or enable the bulk actions feature
  
   **Example:**
	 ```javascript
      config: {
   			bulkActions: false
  			 }
	```
	  
  **actions**
  
  ---
  - type: `object`
  default: `{ edite: true,  delete: true }`
  
  This **Actions** property give the ability to enable or disable the edite & delete features
  
   **Example:**
	 ```javascript
      config: {
   			actions: { 
			          edite: true,
					  delete: false
			}}```
  
  
  **addNewItem**
  
  ---
 - type: `boolean`
 - default: `true`
 
 This bulk **AddNewItem** give you the flexbility to disable or enable adding new item feature
 
   **Example:**
	
	 ```javascript
      config: {
   			addNewItem: false
  			 }```


   **newItemFields**

 ---

 - type: `array`
 - default: `all feed fields`

 This **newItemFields** allow you to define  the new item fields which the user can enter and the type of each field

 **this property accept four property in each object as follow:**
```javascript
       		{
                name: "", \\ The field name
                type: "text", \\ The field type
                required: true, \\ If the field is required or not 
                value: "" \\ Default Value for the input
              }
```


  **editItemsFields**

---

- type: `array`
- default: `all feed fields`

This **editItemsFields** allow to define the edite action fields which the user can modify.

This property accept four in each object as follow: 

```javascript
    {
            name: "name", //Field Name
            type: "text", // Field Type
            required: true, // If required or not
            value: "" // Field Default Value
          }
```

  **columns**

---

- type: `array`
- default: `all feed object key`


This property give the ability to define which feed key to render in the table and also allow you to define which field can be edited inline

This property accept three in each object as follow:

```javascript
    {
            name: "id", //The Coulmn Name
            active: false, //If active or not 
            isEditable: false // is editable or not
          }
```

**searchType**
 - type: `String`
 - default: `local`
 - options: `remote , local`


Though this property you can define the search feature type if local this component will search only in the provided feed and if remote then an event of serach will be triggered after the user enter three character in the search box so you can trigger for example an Ajax request to your backend.



 **Events**
---
This component trigger several events in order the responsbile object to take the neccessary action.

**Events List:**
---
- newItemsadded
- itemChanged
- bulkUpdateActionHasBeenTaken
- bulkDeletedeActionHasBeenTaken
- LimitChanged


**Events Details**
---
Each event give you the assosiated data with that action as follow: 

- newItemsadded 

It will provide an object with values entered 

- item will provide the object content along with the index for that object 

You can listen to those events from the events bus which is created globally 

**For example:**

```javascript
 events.$on("bulkDeletedeActionHasBeenTaken", data => {
     doSomthing(data);
    })
```

#Complete the 
 
**Table Images**



![Table Screen Shot](src/screenshot/TableScreenShot.png)

Inline Bulk Edit 

![Table Screen Shot](src/screenshot/InlineBulkEditing.png)


Add New Screen Shot

![Table Screen Shot](src/screenshot/AddNew.png)
 
  






