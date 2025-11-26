import {
  Avatar,
  Button,
  Flex,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "./index.module.scss";

interface ProfileData {
  name: string;
  email: string;
}

const STORAGE_KEY = "user_profile";

// Helper function to load profile from localStorage
const loadProfile = (): ProfileData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse profile data:", error);
    }
  }
  return { name: "", email: "" };
};

export const Profile = () => {
  const [opened, setOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(loadProfile);

  const form = useForm<ProfileData>({
    initialValues: {
      name: profile.name,
      email: profile.email,
    },
    validate: {
      name: (value) => (!value.trim() ? "Name is required" : null),
      email: (value) => {
        if (!value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return null;
      },
    },
  });

  // Update form when modal opens
  useEffect(() => {
    if (modalOpened) {
      form.setValues(profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpened, profile]);

  // Create or Update profile
  const handleSave = (values: ProfileData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    setProfile(values);
    setModalOpened(false);
  };

  // Delete profile
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your profile data?")) {
      localStorage.removeItem(STORAGE_KEY);
      setProfile({ name: "", email: "" });
      form.reset();
      setModalOpened(false);
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <>
      <Menu shadow="md" width={200} opened={opened} onChange={setOpened} position="right-end">
        <Menu.Target>
          <UnstyledButton py={"md"} w={"100%"} className={classes.profileWrapper}>
            <Flex gap="md" justify="space-between" align="center">
              <Flex gap="md" align="center">
                <Avatar src={null} alt={profile.name || "User"} radius="xl" size="md" color="blue">
                  {getInitials(profile.name)}
                </Avatar>
                <div>
                  <Text size="sm" fw={500}>
                    {profile.name || "Guest User"}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {profile.email || "No email set"}
                  </Text>
                </div>
              </Flex>
              <IconChevronDown
                size={16}
                style={{
                  transition: "transform 0.2s ease",
                  transform: opened ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Flex>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>
          <Menu.Item leftSection={<IconUser size={14} />} onClick={() => setModalOpened(true)}>
            Profile Settings
          </Menu.Item>
          <Menu.Item leftSection={<IconSettings size={14} />}>Preferences</Menu.Item>

          <Menu.Divider />

          <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Profile Settings"
        centered
      >
        <form onSubmit={form.onSubmit(handleSave)}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Enter your name"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              required
              {...form.getInputProps("email")}
            />

            <Group justify="space-between" mt="md">
              <Button
                variant="subtle"
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={handleDelete}
                disabled={!profile.name && !profile.email}
              >
                Delete Profile
              </Button>
              <Group>
                <Button variant="default" onClick={() => setModalOpened(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </Group>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
