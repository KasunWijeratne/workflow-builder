import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  Dialog,
  Input,
  Autocomplete,
  Stack,
  Button,
  Typography,
  SendIcon,
  ShareIcon,
} from '@shared/ui';
import { useAuth, useUsers } from '@shared/auth';
import { useDiagram } from '@shared/canvas';

interface UsersListItem {
  label: string;
  value: string;
}

interface ShareDiagramDialogProps {
  id: string;
}

const ShareDiagramDialog = forwardRef(
  ({ id }: ShareDiagramDialogProps, ref) => {
    const [open, setOpen] = useState(false);
    const [shareInfo, setShareInfo] = useState<UsersListItem | null>(null);
    const [users, setUsers] = useState<UsersListItem[]>([]);
    const { user } = useAuth();

    const { getUsers } = useUsers();
    const { shareDiagram, loading } = useDiagram();

    useImperativeHandle(ref, () => ({
      close: () => setOpen(false),
      open: () => setOpen(true),
    }));

    const handleClose = () => {
      setOpen(false);
    };

    const handleShare = async () => {
      const shareWith = shareInfo?.value;
      if (!shareWith) return;
      await shareDiagram(id, shareWith);
      handleClose();
    };

    useEffect(() => {
      const fetchUsers = async () => {
        const usersList = await getUsers();
        setUsers(
          usersList.reduce((list: UsersListItem[], { email, uid }) => {
            if (uid !== user?.id) {
              list.push({
                label: email,
                value: uid,
              });
            }
            return list;
          }, [] as UsersListItem[])
        );
      };

      fetchUsers();
    }, []);

    return (
      <Dialog onClose={handleClose} open={open}>
        <Stack
          direction={'column'}
          justifyContent={'space-between'}
          sx={{ padding: 2, width: 420, height: 300 }}
        >
          <div>
            <Stack direction={'row'} alignItems={'center'} gap={1} mb={5}>
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                  borderRadius: '50%',
                  height: 25,
                  width: 25,
                  backgroundColor: 'secondary.light',
                }}
              >
                <ShareIcon sx={{ fontSize: 15, color: 'white' }} />
              </Stack>
              <Typography variant="h3">Share diagram</Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary" mb={1}>
              Type and select an email to share this diagram with..
            </Typography>
            <Autocomplete
              disablePortal
              value={shareInfo}
              options={users || []}
              onChange={(_, item) => {
                setShareInfo(item);
              }}
              renderInput={(params) => (
                <Input {...params} placeholder="Email" />
              )}
            />
          </div>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="text"
              color="secondary"
              disabled={loading}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              loading={loading}
              startIcon={<SendIcon />}
              onClick={handleShare}
            >
              Share
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
  }
);

export default ShareDiagramDialog;
