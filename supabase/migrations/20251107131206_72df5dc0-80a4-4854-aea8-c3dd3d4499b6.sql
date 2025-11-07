-- Add 'guest' role to the enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'guest';

-- Create function to auto-assign guest role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'guest');
  RETURN NEW;
END;
$$;

-- Create trigger to automatically assign guest role when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();