\c sigidep_bd;
INSERT INTO public.permissions (id, created_at, updated_at, label, description, context) VALUES (52, now(), now(), 'contribuables.delete', 'contribuables.delete', 'contribuables');
INSERT INTO public.permissions (id, created_at, updated_at, label, description, context) VALUES (53, now(), now(), 'contribuables.create', 'contribuables.create', 'contribuables');
INSERT INTO public.permissions (id, created_at, updated_at, label, description, context) VALUES (54, now(), now(), 'contribuables.read', 'contribuables.read', 'contribuables');
INSERT INTO public.permissions (id, created_at, updated_at, label, description, context) VALUES (55, now(), now(), 'contribuables.update', 'contribuables.update', 'contribuables');
INSERT INTO public.permissions (id, created_at, updated_at, label, description, context) VALUES (56, now(), now(), 'contribuables.delete', 'contribuables.delete', 'contribuables');

INSERT INTO public.role_permissions (id, created_at, updated_at, role_id, permission_id) VALUES (52, now(), now(), 1, 52);
INSERT INTO public.role_permissions (id, created_at, updated_at, role_id, permission_id) VALUES (53, now(), now(), 1, 53);
INSERT INTO public.role_permissions (id, created_at, updated_at, role_id, permission_id) VALUES (54, now(), now(), 1, 54);
INSERT INTO public.role_permissions (id, created_at, updated_at, role_id, permission_id) VALUES (55, now(), now(), 1, 55);
INSERT INTO public.role_permissions (id, created_at, updated_at, role_id, permission_id) VALUES (56, now(), now(), 1, 56);

