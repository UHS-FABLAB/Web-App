Zips = new FS.Collection("zips", {
    stores: [new FS.Store.FileSystem("zips", {path: Meteor.settings.public.zipFolder})]
});
