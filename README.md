# Orders-Queue

system that can receive, process and save orders. The order data will come in a specific JSON format and will have various fields such as type, retailer_order_id, order_lines, shipping_paid, shipping_method_code, retailer_id, expired, and created_at.

The received order will be pushed into a queue, where a separate service will consume the messages and process them. The processing involves setting the order status to "processing" and saving the order to the database, including the order lines which will be linked to the order by a foreign key-primary key relationship.

Finally, a UI page will be created to present a list of orders that have been saved to the database.

## Flow Diagram

![Alt text](./OrderDiagram.drawio.png?raw=true "Diagram")
