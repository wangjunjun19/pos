describe('pos', function () {
  describe('unit testing', function () {
    describe('test buildItems function', function () {

      var inputs;

      beforeEach(function () {
        inputs = [
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000003-2',
          'ITEM000005',
          'ITEM000005',
          'ITEM000005'
        ];
      });

      it('return correct items', function () {

        var items = [
          {
            item: 'ITEM000001',
            count: 5
          },
          {
            item: 'ITEM000003',
            count: 2
          },
          {
            item: 'ITEM000005',
            count: 3
          }
        ];

        expect(buildItems(inputs)).toEqual(items);

      });
    });

    describe('test buildAllItems function', function () {
      
      var items;

      beforeEach(function () {
        items = [
          {
            item: 'ITEM000001',
            count: 5
          },
          {
            item: 'ITEM000003',
            count: 2
          },
          {
            item: 'ITEM000005',
            count: 3
          }
        ];
      });

      it('return correct items', function () {

        var items = [
          {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          }
        ];

        expect(buildAllItems(items)).toEqual(items);

      });
    });

    describe('test buildCartItems function', function () {

      var items;

      beforeEach(function () {
        items = [
          {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          }
        ];
      });

      it('return correct cartItems', function () {

        var cartItems = [
          {
            cartItem: {
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              count: 5
            },
            subtotal: 12,
            saving: 3
          },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              count: 2
            },
            subtotal: 30,
            saving: 0
          },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              count: 3
            },
            subtotal: 9,
            saving: 4.5
          }
        ];

        expect(buildCartItems(items)).toEqual(cartItems);
      });
    });

    describe('test buildReceipt function', function () {
      var cartItems;

      beforeEach(function () {
        cartItems = [
          {
            cartItem: {
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              count: 5
            },
            subtotal: 12,
            saving: 3
          },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              count: 2
            },
            subtotal: 30,
            saving: 0
          },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              count: 3
            },
            subtotal: 9,
            saving: 4.5
          }
        ];
      });

      it('return correct receipt', function () {

        var receipt = {
          cartItems: [
            {
              cartItem: {
                item: {
                  barcode: 'ITEM000001',
                  name: '雪碧',
                  unit: '瓶',
                  price: 3.00
                },
                count: 5
              },
              subtotal: 12,
              saving: 3
            },
            {
              cartItem: {
                item: {
                  barcode: 'ITEM000003',
                  name: '荔枝',
                  unit: '斤',
                  price: 15.00
                },
                count: 2
              },
              subtotal: 30,
              saving: 0
            },
            {
              cartItem: {
                item: {
                  barcode: 'ITEM000005',
                  name: '方便面',
                  unit: '袋',
                  price: 4.50
                },
                count: 3
              },
              subtotal: 9,
              saving: 4.5
            }
          ],
          total: 51,
          costSaving: 7.5
        };

        expect(buildReceipt(cartItems)).toEqual(receipt);
      });
    });
  });

  describe("integration testing", function () {
    var allItems;
    var inputs;

    beforeEach(function () {
      allItems = loadAllItems();
      inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
      ];
    });

    it('should print correct text', function () {

      spyOn(console, 'log');

      printReceipt(inputs);

      var expectText =
        '***<没钱赚商店>收据***\n' +
        '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
        '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
        '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
        '----------------------\n' +
        '总计：51.00(元)\n' +
        '节省：7.50(元)\n' +
        '**********************';

      expect(console.log).toHaveBeenCalledWith(expectText);
    });
  });
});
