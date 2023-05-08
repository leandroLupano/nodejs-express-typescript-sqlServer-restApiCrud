export const queries = {
  getAllProducts: 'SELECT * FROM Products',
  addNewProduct:
    'INSERT INTO [webstore].[dbo].[Products] (name, description, quantity) VALUES (@name,@description,@quantity)',
  getProductById: 'SELECT * FROM Products WHERE Id = @Id',
  deleteProductById: 'DELETE FROM [webstore].[dbo].[Products] WHERE Id=@Id',
  countTotalProducts: 'SELECT COUNT (*) FROM [webstore].[dbo].[Products]',
  updateProductById:
    'UPDATE [webstore].[dbo].[Products] SET Name=@name, Description=@description, Quantity=@quantity WHERE Id=@Id',
};
