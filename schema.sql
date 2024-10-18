CREATE TABLE
  users (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Can view own user data." ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Can edit own user data." ON users FOR UPDATE USING (auth.uid() = id);

CREATE
OR REPLACE FUNCTION auth.create_user () RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE
OR REPLACE TRIGGER create_user
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE FUNCTION auth.create_user ();

CREATE TABLE
  products (
    id UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT NULL,
    features TEXT[] NULL,
    image_url VARCHAR(130) NULL,
    price DECIMAL (10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- Duration in days
    stock INTEGER NOT NULL DEFAULT 0,
    preset_code TEXT NULL, -- Preset code for product
    is_vip BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Can view all products." ON products FOR SELECT USING (true);

CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  customer_id UUID REFERENCES auth.users NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(10) NOT NULL DEFAULT 'PAYPAL', -- Payment method could be STRIPE, PAYPAL, etc.
  payment_status VARCHAR(10) NOT NULL DEFAULT 'PENDING', -- Status could be PENDING, PAID, CANCELLED, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Can view own orders." ON orders FOR
SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Can insert order." ON orders FOR
INSERT
  WITH CHECK (customer_id = auth.uid());

CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0), -- Ensures quantity is always positive
  price_at_time DECIMAL(10, 2) NOT NULL, -- Stores price of product at the time of purchase
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Can view own order items." ON order_items FOR
SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid()
    )
  );

CREATE POLICY "Can insert order items." ON order_items FOR
INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid()
    )
  );
